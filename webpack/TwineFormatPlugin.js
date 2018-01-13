var fs = require("fs");
var uglify = require("uglify-js");
const jimp = require("jimp");

function TwineFormatPlugin(options) {
	
}

TwineFormatPlugin.prototype.apply = function(compiler) {
	compiler.plugin('emit', (compilation, callback) => {
		let template = fs.readFileSync("index.html").toString();
		// We use `() => ...` for the second arg of replace because otherwise, it leads
		// to specific behavior when encountering `$'`

		let designCode = compilation.assets["./dist/design.css"] != null ? compilation.assets["./dist/design.css"].source() : "null";
		// Process the macros to insert base64-encoded images into the `.css`
		// Because `jimp` is async only, we have to do some workarounds
		// to make everything work. It's ugly, but it works.
		let base64EncodedImages = {};
		let i = 0;
		let max = 0;
		designCode.replace(/\[\[(.*)\]\]/gi, (substring, argsString) => {
			max++;
			let args = argsString.split(",");
			jimp.read(args[0], (err, img) => {
				if (err != null) {
					console.log(err);
					return;
				}

				if (args.length > 1) {
					let x = parseInt(args[1]);
					let y = parseInt(args[2]);
					let w = parseInt(args[3]);
					let h = parseInt(args[4]);
					
					img.crop(x, y, w, h);
				}
				
				img.scale(2, jimp.RESIZE_NEAREST_NEIGHBOR);

				img.getBase64(jimp.MIME_PNG, (err, base64) => {
					if (err != null) {
						console.log(err);
						throw new Error(err);
					}

					base64EncodedImages[substring] = base64;
					i++;
					if (i == max) {
						// We finished encoding all images
						// We can now replace the macros in the css
						designCode = designCode.replace(/\[\[(.*)\]\]/gi, (substring, argsString) => {
							return base64EncodedImages[substring];
						});

						let source = template
							.replace("/*{{DESIGN}}*/", () => designCode)
							.replace("/*{{CODE}}*/", () => compilation.assets["./dist/bundle-code.js"] != null ? compilation.assets["./dist/bundle-code.js"].source() : "");

						let options = {
							name: "Adventures",
							version: "1.1.1",
							author: "Longwelwind",
							description: "A story format to create RPG stories with health, loot, gold and more. See its <a href=\"https://longwelwind.github.io/adventures/\">documentation</a>",
							proofing: false,
							source: source
						};
						
						let formatFile = "window.storyFormat(" + JSON.stringify(options, null, 2) + ");";
						compilation.assets["./dist/format.js"] = {
							source: () => formatFile,
							size: () => formatFile.length
						};
						// Not necessary, only for debugging purposes
						compilation.assets["./dist/source.html"] = {
							source: () => source,
							size: () => source.length
						};

						callback();
					}
				});
			});
		});
	});
};

module.exports = TwineFormatPlugin;
