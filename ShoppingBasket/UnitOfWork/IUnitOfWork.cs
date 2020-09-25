using Repositories;

namespace UnitOfWork
{
    public interface IUnitOfWork
    {
        ICustomerRepository Customer { get; }
        IUserRepository User { get; }
        ISupplierRepository Supplier { get; }
        IProductRepository Product { get; }
    }
}
