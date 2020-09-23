using Repositories;
using UnitOfWork;

namespace DataAccess
{
    public class UnitOfWork : IUnitOfWork
    {
        public UnitOfWork(string connectionString)
        {
            User = new UserRepository(connectionString);
        }

        public IUserRepository User { get; private set; }
    }
}
