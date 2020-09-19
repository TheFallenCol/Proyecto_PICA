using DBModels;
using System.Collections.Generic;

namespace Repositories
{
    public interface IUserRepository:IRepository<User>
    {
        IEnumerable<User> ValidateUser(string email, string password);
    }
}
