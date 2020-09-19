using Repositories;
using UnitOfWork;

namespace DataAccess
{
    public class UnitOfWork : IUnitOfWork
    {
        public UnitOfWork(string connectionString)
        {
            Customer = new CustomerRepository(connectionString);
            User = new UserRepository(connectionString);
        }

        public ICustomerRepository Customer { get; private set; }

        public IUserRepository User { get; private set; }
    }
}
