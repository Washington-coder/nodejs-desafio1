export function buildRoutePath(path) {
  // Identifica onde tem :id ou qualquer outro parâmetro com ":"
  const routeParametersRegex = /:([a-zA-Z]+)/g
  
  // Substitui pelo padrão de Regex que aceita letras/números/hifens
  const pathWithParams = path.replaceAll(routeParametersRegex, '(?<$1>[a-z0-9\\-_]+)')

  // Retorna a Regex final (ex: ^/tasks/(?<id>[a-z0-9\-_]+)$ )
  const pathRegex = new RegExp(`^${pathWithParams}(?<query>\\?(.*))?$`)

  return pathRegex
}
