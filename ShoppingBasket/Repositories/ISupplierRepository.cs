using DBModels;
using System.Collections.Generic;

namespace Repositories
{
    public interface ISupplierRepository : IRepository<Supplier>
    {
        IEnumerable<Supplier> SupplierPagedList(int page, int rows);
    }
}
