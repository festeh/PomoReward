firefox_app_final:
	@mkdir -p firefox_app_final

firefox_app_final/manifest.json: firefox_manifest.json firefox_app_final 
	cp $< $@

firefox_app_final/data/page/%: data/page/%
	[ -d firefox_app_final/data/page ] || mkdir -p firefox_app_final/data/page
	cp $< $@

firefox_app_final/data/options/%: data/options/%
	[ -d firefox_app_final/data/options ] || mkdir -p firefox_app_final/data/options
	cp $< $@

firefox_app_final/images/%: images/% firefox_app_final
	[ -d firefox_app_final/images ] || mkdir -p firefox_app_final/images
	cp $< $@

.PHONY: firefox
firefox: firefox_app_final/manifest.json $(addprefix firefox_app_final/data/options/, index.html index.js index.css) $(addprefix firefox_app_final/data/page/, content.js content.css) firefox_app_final/images/peka.png
	@echo "done"

pomoreward.firefox.zip: firefox
	cd firefox_app_final && zip -r ../$@ *

chrome:

