/*const sum = require('./sum');
test('Espera os valores 1 + 2 e o resultado tem que ser iqual a 3', () => {
  expect(sum(1, 2)).toBe(3);
});
*/

const jwt = require('jsonwebtoken');
const middlewareUser = require('../middleware/login'); 
const httpMocks = require('node-mocks-http'); 
jest.mock('jsonwebtoken');

describe('Teste do middlewareUser', () => {
  it('deve retornar 403 se não houver token', () => {
    const req = httpMocks.createRequest();
    const res = httpMocks.createResponse();
    const next = jest.fn();

    middlewareUser(req, res, next);

    expect(res.statusCode).toBe(403);
    expect(res._getData()).toBe('Acesso negado');
  });

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
