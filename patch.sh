# Delete the old generated stuff to eliminate any confusion or dead links.

rm -rf ./doc

# Delete cached templates in case a mustache template has been updated/modified.

rm -rf node_modules/bit-docs/lib/configure/node_modules/bit-docs-generate-html/site/templates

# Allows hacking on @signature template.

cp -f 'patch-signature.mustache' 'node_modules/bit-docs/lib/configure/node_modules/bit-docs-js/templates/signature.mustache'

# This is needed to make @signature show up in generated site.

cp -f 'patch-content.mustache' 'node_modules/bit-docs/lib/configure/node_modules/bit-docs-generate-html/site/default/templates/content.mustache'