using DBModels;
using System.Collections.Generic;

namespace Repositories
{
    public interface ICustomerRepository:IRepository<Customer>
    {
        IEnumerable<Customer> CustomerPagedList(int page, int rows);
    }
}
