using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using InwentarzWGospodarstwie.Server.Models;

namespace InwentarzWGospodarstwie.Server.Data
{
    public class Database : IdentityDbContext<User>
    {
        public Database(DbContextOptions<Database> options) : base(options) 
        {
        }
    }
}
