using Microsoft.EntityFrameworkCore;
using server.Models;

namespace server.Data;

public class DatabaseContext: DbContext
{
    public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options)
    {
        
    }
    
    public DbSet<User> Users { get; set; }
    public DbSet<HashID> HashIds { get; set; }
    public DbSet<Event> Events { get; set; }
}