const TeachersController = require('../controllers/TeachersController');
const UserModel = require('../models/UserModel');

jest.mock('../models/UserModel');

describe('TeachersController', async () => {
  it('deve retornar sucesso ao deletar um professor', async () => {
    const req = {
      params: { id: 1 },
    };
    const res = {
      send: jest.fn(),
      status: jest.fn(() => res),
    };

    UserModel.destroy.mockResolvedValue(1);

    await TeachersController.deleteTeacher(req, res);

    expect(res.send).toHaveBeenCalledWith('Sucess');
  });

  it('deve retornar erro ao tentar deletar um professor que não existe', async () => {
    const req = {
      params: { id: 1 },
    };
    const res = {
      send: jest.fn(),
      status: jest.fn(() => res),
    };

    UserModel.destroy.mockResolvedValue(0);

    await TeachersController.deleteTeacher(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith('Error');
  });
});
