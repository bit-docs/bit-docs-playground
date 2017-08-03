divu="-----------------------------------[bit-docs]-----------------------------------"
divd="--------------------------------------------------------------------------------"

case "${1}" in
  start)
    if [ ! -d 'node_modules/bit-docs/lib/configure/node_modules' ]; then
      touch '.bit_docs_installing'
      msg='INSTALLING bit-docs PLUGINS ⏰ THIS MAY TAKE A COUPLE OF MINUTES ⏰'
    fi
    ;;
  finish)
    if [ -f '.bit_docs_installing' ]; then
      rm -f '.bit_docs_installing'
      msg='⏰ THANK YOU FOR BEING PATIENT ⏰ INSTALLING bit-docs IS COMPLETE!'
    fi
    ;;
  glitch)
    msg='CLICK Show [Live] ON GLITCH TO SEE YOUR GENERATED SITE!'
    ;;
  local)
    msg="VISIT http://localhost:${PORT:-3000}/ TO SEE YOUR GENERATED SITE!"
    ;;
  patch)
    if [ -f 'patch/patcher.sh' ]; then
      source 'patch/patcher.sh'
      msg='PATCHED bit-docs WITH patch/patcher.sh'
    fi
    ;;
esac

[ -z "${msg}" ] || printf "\n%s\n%s\n%s\n" "${divu}" "${msg}" "${divd}"
