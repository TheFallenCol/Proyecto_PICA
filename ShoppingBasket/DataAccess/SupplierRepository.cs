using System.Collections.Generic;
using System.Data.SqlClient;
using Dapper;
using DBModels;
using Repositories;

namespace DataAccess
{
    public class SupplierRepository : Repository<Supplier>, ISupplierRepository
    {
        public SupplierRepository(string _connectionString) : base(_connectionString)
        {
        }

        public IEnumerable<Supplier> SupplierPagedList(int page, int rows)
        {
            var parameters = new DynamicParameters();
            parameters.Add("@page", page);
            parameters.Add("@rows", rows);

            using (var connection = new SqlConnection(_connectionString))
            {
                return connection.Query<Supplier>("dbo.SupplierPagedList", parameters, commandType: System.Data.CommandType.StoredProcedure);
            }
        }
    }
}
