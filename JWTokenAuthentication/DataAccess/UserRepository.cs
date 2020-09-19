using Dapper;
using DBModels;
using Repositories;
using System.Collections.Generic;
using System.Data.SqlClient;

namespace DataAccess
{
    public class UserRepository : Repository<User>, IUserRepository
    {
        public UserRepository(string _connectionString) : base(_connectionString)
        {

        }

        public IEnumerable<User> ValidateUser(string email, string password)
        {
            var parameters = new DynamicParameters();
            parameters.Add("@email", email);
            parameters.Add("@password", password);

            using(var connection = new SqlConnection(_connectionString))
            {
                return connection.Query<User>("dbo.ValidateUser", parameters, commandType: System.Data.CommandType.StoredProcedure);
            }

        }
    }
}
