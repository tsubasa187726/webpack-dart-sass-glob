const path = require("path");
const glob = require("glob");

module.exports = function(source) {
  let replacedSource = source;
  const workingDir = path.dirname(this.resourcePath);
  const importStatementList = [...source.matchAll(/(?<type>@use|@forward)\s+["'](?<globPath>[^"']*\*[^"']*)["'](?<as>\s+as\s+\*)?(?<semi>;)?/g)];
  for(const importStatement of importStatementList) {
    const { type, globPath, as, semi} = importStatement.groups;
    const importPathList = glob.sync(globPath, {
      cwd: workingDir,
      nodir: true
    });
    const replaceList = [];
    for(const importPath of importPathList) {
      //Convert backslash to slash with Windows countermeasure
      replaceList.push(`${type} "${importPath.replace(/\\/g, '/')}" ${as ?? ""}${semi ?? ""}`);
    }
    replacedSource = replacedSource.replace(importStatement[0], replaceList.join("\n"));
  }
  return replacedSource;
}
