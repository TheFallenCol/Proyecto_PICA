using Dapper;
using DBModels;
using Repositories;
using System.Data.SqlClient;

namespace DataAccess
{
    public class UserRepository : Repository<User>, IUserRepository
    {
        public UserRepository(string _connectionString) : base(_connectionString)
        {

        }

        public User ValidateUser(string nickname, string password)
        {
            var parameters = new DynamicParameters();
            parameters.Add("@nickname", nickname);
            parameters.Add("@password", password);

            using (var connection = new SqlConnection(_connectionString))
            {
                return connection.QueryFirstOrDefault<User>("dbo.ValidateUser", parameters, commandType: System.Data.CommandType.StoredProcedure);
            }

        }
    }
}
