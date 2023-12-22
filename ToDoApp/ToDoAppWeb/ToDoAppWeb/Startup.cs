using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;

using ToDoAppWeb.Repository;
using ToDoAppWeb.Service;

namespace ToDoAppWeb
{
  
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddPolicy("AllowSpecificOrigin",
                builder => builder.WithOrigins("http://localhost:4200")
                              .AllowAnyMethod()
                              .AllowAnyHeader());
            });
            services.AddControllers();

            services.AddDbContext<AppDbContext>(options =>
                options.UseMySQL(Configuration.GetConnectionString("DefaultConnection")));
            
            services.AddScoped<TaskRepository>();
            services.AddScoped<GenericRepository<Model.Task>>();
            //services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));
            services.AddScoped<TaskService>();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseRouting();

            app.UseCors("AllowSpecificOrigin"); // Додайте цей рядок

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }

}
