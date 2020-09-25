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
            Supplier = new SupplierRepository(connectionString);
            Product = new ProductRepository(connectionString);
        }

        public ICustomerRepository Customer { get; private set; }

        public IUserRepository User { get; private set; }
        public ISupplierRepository Supplier { get; private set; }
        public IProductRepository Product { get; private set; }
    }
}
