fixture: 
	jsx --output fixtures/expected/hello.jsx.js fixtures/hello.jsx
	jsx --output fixtures/expected/hello.node.jsx.js --executable node fixtures/hello.jsx
	jsx --output fixtures/expected/hello.release.jsx.js --executable node --release fixtures/hello.jsx
	jsx --output fixtures/expected/import.jsx.js --add-search-path fixtures/ fixtures/import.jsx
	jsx --output fixtures/expected/import2.jsx.js --add-search-path fixtures/ --add-search-path fixtures2/ fixtures/import.jsx
	jsx --output fixtures/expected/fizzbuzz.min.jsx.js --minify fixtures/fizzbuzz.jsx
	jsx --output fixtures/expected/fizzbuzz.prof.jsx.js --profile fixtures/fizzbuzz.jsx
	jsx --output fixtures/expected/fizzbuzz.opt.jsx.js --optimize no-assert,inline,no-debug fixtures/fizzbuzz.jsx
	jsx --output fixtures/expected/fizzbuzz.disopt.jsx.js --disable-optimize array-length,unclassify fixtures/fizzbuzz.jsx
	jsx --output fixtures/expected/fizzbuzz.srcmap.jsx.js --enable-source-map fixtures/fizzbuzz.jsx
	jsx --output fixtures/expected/fizzbuzz.warn.jsx.js --warn all fixtures/fizzbuzz.jsx
	jsx --output fixtures/expected/fizzbuzz.mode.jsx.js --mode parse fixtures/fizzbuzz.jsx
	jsx --output fixtures/expected/fizzbuzz.target.jsx.js --target javascript fixtures/fizzbuzz.jsx
	jsx --output fixtures/expected/template --mode doc fixtures/template.jsx
	jsx --output fixtures/expected/hello.js fixtures/hello.jsx
	jsx --output fixtures/expected/fizzbuzz.arg.jsx.js --minify --profile --add-search-path fixtures/ fixtures/fizzbuzz.jsx
