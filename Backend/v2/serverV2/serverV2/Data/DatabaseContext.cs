using System;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using serverV2.Models;

namespace serverV2.Data
{
    public class DatabaseContext : IdentityDbContext<ApplicationUser>
    {
        public DatabaseContext(DbContextOptions<DatabaseContext> options)
            : base(options)
        {
        }

        public DbSet<UserTask> UserTasks { get; set; }
        public DbSet<serverV2.Models.Task> Tasks { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<UserTask>()
                .HasOne(ut => ut.User)
                .WithMany()
                .HasForeignKey(ut => ut.UserId);

            builder.Entity<UserTask>()
                .HasOne(ut => ut.Task)
                .WithMany()
                .HasForeignKey(ut => ut.TaskId);
        }
    }
}
