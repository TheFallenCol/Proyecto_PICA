using DBModels;
using System.Collections.Generic;

namespace Repositories
{
    public interface IUserRepository : IRepository<User>
    {
        User ValidateUser(string nickname, string password);
    }
}
