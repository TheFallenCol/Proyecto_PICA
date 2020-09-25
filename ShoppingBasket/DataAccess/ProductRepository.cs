using System;
using System.Collections.Generic;
using System.Text;
using DBModels;
using Repositories;

namespace DataAccess
{
    public class ProductRepository : Repository<Product>, IProductRepository
    {
        public ProductRepository(string _connectionString) : base(_connectionString)
        {
        }
    }
}
