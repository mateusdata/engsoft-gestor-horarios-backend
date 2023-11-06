/**
 * Módulo JWT.
 * @module jwt
 */
const jwt = require('jsonwebtoken');

/**
 * Módulo middlewareUser.
 * @module middlewareUser
 */
const middlewareUser = require('../middleware/login'); 

/**
 * Módulo httpMocks.
 * @module httpMocks
 */
const httpMocks = require('node-mocks-http'); 

jest.mock('jsonwebtoken');

/**
 * Teste do middlewareUser.
 * @function
 */
describe('Teste do middlewareUser', () => {
  /**
   * Deve retornar 403 se não houver token.
   * @function
   */
  it('deve retornar 403 se não houver token', () => {
    const req = httpMocks.createRequest();
    const res = httpMocks.createResponse();
    const next = jest.fn();

    middlewareUser(req, res, next);

    expect(res.statusCode).toBe(403);
    expect(res._getData()).toBe('Acesso negado');
  });

  /**
   * Deve retornar 401 se o token for inválido ou expirado.
   * @function
   */
  it('deve retornar 401 se o token for inválido ou expirado', () => {
    jwt.verify.mockImplementation((token, secret, cb) => {
      cb(true);
    });

    const req = httpMocks.createRequest({
      headers: {
        Authorization: 'Bearer token'
      }
    });
    const res = httpMocks.createResponse();
    const next = jest.fn();

    middlewareUser(req, res, next);

    expect(res.statusCode).toBe(401);
    expect(JSON.parse(res._getData())).toEqual({ message: 'Token inválido ou expirado' });
  });

  /**
   * Deve chamar next se o token for válido.
   * @function
   */
  it('deve chamar next se o token for válido', () => {
    jwt.verify.mockImplementation((token, secret, cb) => {
      cb(false, { id_token: '123' });
    });

    const req = httpMocks.createRequest({
      headers: {
        Authorization: 'Bearer token'
      }
    });
    const res = httpMocks.createResponse();
    const next = jest.fn();

    middlewareUser(req, res, next);

    expect(req.id_token).toBe('123');
    expect(next).toHaveBeenCalled();
  });
});
