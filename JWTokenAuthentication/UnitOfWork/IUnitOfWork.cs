using Repositories;

namespace UnitOfWork
{
    public interface IUnitOfWork
    {        
        IUserRepository User { get; }
    }
}
