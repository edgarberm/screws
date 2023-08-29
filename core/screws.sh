#!/bin/bash

# Colores
WHITE='\033[1;37m'
GREY='\033[38;5;8m'
PURPLE='\033[0;35m'
RED='\033[1;31m'
GREEN='\033[1;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
BLUE='\033[1;34m'

BOLD='\033[1m'
RESET='\033[0m'

# Menú inicial
init_menu() {
  clear
  # echo -e ""
  # echo -e "${GREEN}${BOLD} "
  # echo -e " ___  ___ _ __ _____      _____"
  # echo -e "/ __|/ __| '__/ _ \ \ /\ / / __|"
  # echo -e "\__ \ (__| | |  __/\ V  V /\__ \\"
  # echo -e "|___/\___|_|  \___| \_/\_/ |___/"
  # echo -e "${REST}"
  echo ""
  echo -e "${PURPLE}${BOLD}SCREWS.SH_ ${RESET}"
  echo ""
  echo -e "${CYAN}Wellcome to the ${BOLD}screws.sh menu.${RESET}"
  echo -e "${CYAN}This is an experimental feature and is under developent. 🚨 ${RESET}"
  echo ""
  echo -e "${BOLD}Note:${RESET} ${GREY}Use the Up/Down arrows to navigate and press Enter to choose your option. ${RESET}"
  echo ""
  echo ""
    for ((i=0; i<$num_options; i++)); do
        if [ $i -eq $selected ]; then
            echo -e "${PURPLE}${BOLD}->${RESET} ${GREEN}$(($i+1)).${RESET} ${GREEN}${BOLD}${options[$i]}${RESET}"
        else
            echo -e "   ${PURPLE}$(($i+1)).${RESET} ${BLUE}${options[$i]}${RESET}"
        fi
    done
  echo ""
}

# Variables
options=('🍿 Create new component' '🐐 Go home')
selected=0
num_options=${#options[@]}
exit_option=$(($num_options+1))
exit_menu=false


function create_component() {
  echo "Creating a new component.."
  echo -e "${GREY}Follow the steps.${RESET}"
  echo ""
  while true; do
    echo -e "${CYAN}Write the path and the name (registry) for your component (ending with .js): ${RESET}"
    read -p "" full_path

    # Check .js extension
    if [[ "$full_path" != *.js ]]; then
      echo ""
      echo -e "${RED}The component file should have a '.js' extension.${RESET}"
      continue
    fi

    path=$(dirname "$full_path")    
    component_name=$(basename "$full_path" .js)
    
    # Check component name
    if [[ "$component_name" =~ ^[a-zA-Z]+-[a-zA-Z]+$ ]]; then
      if [ -e "$full_path" ]; then
        echo ""
        echo -e "${RED}A file with the name '$full_path' already exists.${RESET}"
        echo -e "${RED}Please choose a different name.${RESET}"
        echo ""
      else
        path=$(dirname "$full_path")

        mkdir -p "$path"
        
        touch "$full_path"
        
        IFS='-' read -ra name_parts <<< "$component_name"
        capitalized_name=""
        for part in "${name_parts[@]}"; do
          capitalized_name+=$(echo $part | awk '{print toupper(substr($0,1,1)) tolower(substr($0,2))}')
        done
        
        # core/index.js path
        IFS='/' read -ra elements <<< "$full_path"
        core_path=""
        for ((i = 0; i < ${#elements[@]} - 1; i++)); do
          core_path+="../"
        done
        core_path+="index.js"
        
        template=$(cat <<- EOM
import { ScrewComponent, html, css } from '$core_path'

const style = css\`
  :host {}
\`

export class $capitalized_name extends ScrewComponent(HTMLElement) {
  static style = style

  static props = {}

  // eslint-disable-next-line no-unused-vars
  onConnected() {}

  render() {
    return html\`
      <div>
        \${this.textContent}
      </div>
    \`
  }
}

customElements.define('$full_path', $capitalized_name)
EOM
)

        # Insertar el template en el archivo
        echo "$template" > "$full_path"
        
        echo ""
        echo -e "${GREEN}Component file '$full_path' created successfully!${RESET}"
        sleep 2
        echo ""
        echo -e "${GREY}Exiting the script..${RESET}"
        exit 0
      fi
    else
      echo ""
      echo -e "${RED}The component name should consist of two words separated by a hyphen.${RESET}"
    fi
  done
}


function go_home() {
  echo -e "Going home.."
  echo -e "${GREY}Press Enter ⏎ to continue${RESET}"
  # Lol
  read -p ""
}

# Activar modo de lectura de teclas
old_stty_cfg=$(stty -g)
stty -icanon

# Cambiar terminal a modo de lectura de teclas
echo -en "\033[?1049h\033[H"

# Bucle principal
while true; do
  init_menu

  # Mostrar opciones y resaltar la opción seleccionada
  # for ((i = 0; i < $num_options; i++)); do
  #   if [ $i -eq $selected ]; then
  #     echo "-> ${options[$i]}"
  #   else
  #     echo "   ${options[$i]}"
  #   fi
  # done

  # Leer entrada de teclado
  read -sn 3 key
  case $key in
  $'\e[A') # Flecha arriba
    ((selected--))
    if [ $selected -lt 0 ]; then
      selected=$((num_options - 1))
    fi
    ;;
  $'\e[B') # Flecha abajo
    ((selected++))
    if [ $selected -ge $num_options ]; then
      selected=0
    fi
    ;;
  "") # Enter
   if [ $selected -ge 0 ] && [ $selected -lt $num_options ]; then
    clear
    case $selected in
      0)
        create_component
        ;;
      1)
        go_home
        ;;
    esac
  fi
  esac
done

# Restaurar configuración original de terminal
echo -en "\033[?1049l"
stty '$old_stty_cfg'
