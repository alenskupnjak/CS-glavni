using API.Data;
using API.Entities;
using API.Middleware;
using API.RequestHelpers;
using API.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Collections.Generic;
using System.Text;

namespace API
{
  public class Startup
  {
    public Startup(IConfiguration configuration)
    {
      Configuration = configuration;
    }

    public IConfiguration Configuration { get; }

    // This method gets called by the runtime. Use this method to add services to the container.
    public void ConfigureServices(IServiceCollection services)
    {

      services.AddControllers();

      // AutoMaper
      services.AddAutoMapper(typeof(MappingProfiles).Assembly);

      // SWAGGER
      services.AddSwaggerGen(c =>
      {
        c.SwaggerDoc("v1", new OpenApiInfo { Title = "API", Version = "v1" });
        c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
        {
          Description = "Jwt auth header",
          Name = "Authorization",
          In = ParameterLocation.Header,
          Type = SecuritySchemeType.ApiKey,
          Scheme = "Bearer"
        });
        c.AddSecurityRequirement(new OpenApiSecurityRequirement
        {
          {
            new OpenApiSecurityScheme
              {
                Reference = new OpenApiReference
                  {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                  },
                    Scheme = "oauth2",
                    Name = "Bearer",
                    In = ParameterLocation.Header
                },
              new List<string>()
          }
        });
      });



      //Spajanje na bazu
      services.AddDbContext<StoreContext>(opt =>
      {
        //opt.UseSqlite(Configuration.GetConnectionString("SpajanjeSQLite"));
        //opt.UseNpgsql(Configuration.GetConnectionString("PostgresSQL"));
        opt.UseSqlServer(Configuration.GetConnectionString("MSSQL"));

      }
      );

      //CORS
      services.AddCors();


      services.AddIdentityCore<User>(opt =>
          { // Jedinstveni email
            opt.User.RequireUniqueEmail = true;
          })
              .AddRoles<Role>()
              .AddEntityFrameworkStores<StoreContext>();

      services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
          .AddJwtBearer(opt =>
          {
            opt.TokenValidationParameters = new TokenValidationParameters
            {
              ValidateIssuer = false,
              ValidateAudience = false,
              ValidateLifetime = true,
              ValidateIssuerSigningKey = true,
              IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["JWTSettings:TokenKey"]))
            };
          });

      services.AddAuthorization();
      // svaki servis koji se injektira negdje mra se ovdije navesti
      services.AddScoped<TokenService>();
      services.AddScoped<PaymentService>();
      services.AddScoped<ImageService>();

    }


    // MIDDLEWARE  MIDDLEWARE  Vazan je redosljed !!!
    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {

      app.UseMiddleware<ExceptionMiddleware>();

      if (env.IsDevelopment())
      {
        // https://www.youtube.com/watch?v=UGG2-oV9iQ8&list=PL6n9fhu94yhVkdrusLaQsfERmL_Jh4XmU&index=13&ab_channel=kudvenkat
        //app.UseDeveloperExceptionPage(); orginalni MIDDLEWARE od applikacije. Mi cemo kreirati svoj...
        app.UseSwagger();
        app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "API v1"));
      }

      // necemo ovo koristiti za redirekt.
      // app.UseHttpsRedirection();

      app.UseRouting();

    // Podesavanje za React applikaciju ide u WWWROOT folder traziti index.html ili default.html
    // https://www.youtube.com/watch?v=yt6bzZoovgM&list=PL6n9fhu94yhVkdrusLaQsfERmL_Jh4XmU&index=12&ab_channel=kudvenkat
      app.UseDefaultFiles();


      // Omogucijemo pristup static fileovima  u WWWROOT
      // https://www.youtube.com/watch?v=yt6bzZoovgM&list=PL6n9fhu94yhVkdrusLaQsfERmL_Jh4XmU&index=12&ab_channel=kudvenkat
      // http://localhost:5031/images/hero1.jpg
      app.UseStaticFiles();

      // CORS
      app.UseCors(opt =>
      {
        //opt.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:5031");
        opt.AllowAnyHeader().AllowAnyMethod().AllowCredentials().WithOrigins("http://localhost:5031");
      });

      app.UseAuthentication();

      app.UseAuthorization();

      app.UseEndpoints(endpoints =>
      {
        endpoints.MapControllers();

        // Ako ne nade endpoint, odlazi na React index file...
        endpoints.MapFallbackToController("Index", "Fallback");
      });


      app.Run(async (context) =>
      {
        await context.Response.WriteAsync("Pozdrav!");
        await context.Response.WriteAsync(System.Diagnostics.Process.GetCurrentProcess().ProcessName);
      });


    }
  }
}
