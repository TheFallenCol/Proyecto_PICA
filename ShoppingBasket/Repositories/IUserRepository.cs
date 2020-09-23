using DBModels;

namespace Repositories
{
    public interface IUserRepository : IRepository<User>
    {
        User ValidateUser(string nickname, string password);
    }
}
