# Allows hacking on @signature template.

cp -f 'patch/templates/signature.mustache' 'node_modules/bit-docs/lib/configure/node_modules/bit-docs-js/templates/signature.mustache'

# This is needed to make @signature show up in generated site.

cp -f 'patch/templates/content.mustache' 'node_modules/bit-docs/lib/configure/node_modules/bit-docs-generate-html/site/default/templates/content.mustache'
