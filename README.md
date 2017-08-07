# Adventures

Adventures is a custom story format for [Twine 2](https://twinery.org) that allows writers to make interactive stories with RPG elements such as health, items, inventory, gold and more.

## Usage

Information about how installing and creating stories in Adventures is [available here](http://longwelwind.github.io/adventures).

## Development

If you wish modify Adventures, you can clone the repository and install the dependencies using:

```
npm install
```

### Assets

Adventures uses [7Soul's excellent but-not-free assets](https://7soul.itch.io/). Because I obviously can't redistribute them freely, they aren't included in the repository if you clone it. You will need to buy them if you want to build Adventures. You will need at least:

* [7Soul's RPG Graphics - Icons](https://7soul.itch.io/7souls-rpg-graphics-pack-1-icons)
* [7Soul's RPG Graphics - UI](https://7soul.itch.io/7souls-rpg-graphics-pack-2-ui)

Once you obtained them, you need to unzip the archive files into the `images/` folder. Once done, you should have a folder directory that roughly lookes like this:

```
adventures/
├─ ...
├─ images/
|  ├─ Arrows/
|  ├─ Bars/
|  ├─ Buttons/
|  ├─ ...
|  ├─ Pack 1B/
|  ├─ Pack 1B-Renamed/
|  └─ ...
├─ ...
```

### Debug & Build

If you want modify Adventures, you will want to build & debug it locally:

* First launch Webpack using the command:

```
npm run start
```

* In Twine, add the custom story format by clicking `Formats`, then `Add a New Format` and then past the file address to `format.js` which should look like:
```
(On Windows)
file:///E:/Users/.../adventures/dist/format.js
(On Unix)
file:///home/.../adventures/dist/format.js
```

With this setup, you don't need to re-add the custom story format everytime you make a modification in the code. Twine will automatically take the newest version of `format.js` everytime you launch your story.