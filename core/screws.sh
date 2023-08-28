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
  echo -e ""
  echo -e "${GREEN}${BOLD} "
  echo -e " ___  ___ _ __ _____      _____"
  echo -e "/ __|/ __| '__/ _ \ \ /\ / / __|"
  echo -e "\__ \ (__| | |  __/\ V  V /\__ \\"
  echo -e "|___/\___|_|  \___| \_/\_/ |___/"
  echo -e "${REST}"
  echo ""
  echo -e "${CYAN}Wellcome to the ${BOLD}screws.sh menu${RESET}${CYAN}. Here you can choose many tasks to deal with. ${RESET}"
  echo -e "${CYAN}For now, is an experimental feature and is under developent. Drop your feedback! ${RESET}"
  echo ""
  echo -e "${PURPLE}${BOLD}Note:${RESET} ${GREY}Use the Up/Down arrows to navigate and press Enter to choose your option. ${RESET}"
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

function create_component() {
  echo "Creating a new component..."
  # Agregar el código real para crear un componente aquí
  # Por ejemplo, mostrar otro prompt para la nueva funcionalidad
  read -p "Presiona Enter para continuar..."
}

function go_home() {
  echo "Going home..."
  # Agregar el código real para volver a la página principal aquí
  # Por ejemplo, mostrar el menú principal de nuevo
  read -p "Presiona Enter para continuar..."
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
