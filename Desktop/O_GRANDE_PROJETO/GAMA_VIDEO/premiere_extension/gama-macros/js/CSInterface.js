/**
 * Shim mínimo do CSInterface (Adobe CEP).
 * Implementa apenas o que o painel GAMA Macros usa:
 *  - evalScript: executa ExtendScript no host (Premiere)
 *  - getExtensionPath: caminho da pasta desta extensão
 */
function CSInterface() {}

CSInterface.prototype.evalScript = function (script, callback) {
  callback = callback || function () {};
  try {
    window.__adobe_cep__.evalScript(script, callback);
  } catch (e) {
    callback('EvalScript error.');
  }
};

CSInterface.prototype.getExtensionPath = function () {
  try {
    var path = decodeURIComponent(window.__adobe_cep__.getSystemPath('extension'));
    path = path.replace('file:///', '').replace('file://', '');
    return path;
  } catch (e) {
    return '';
  }
};
