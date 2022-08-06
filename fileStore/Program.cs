using Ipfs.Engine;

var builder = WebApplication.CreateBuilder(args);
var services = builder.Services;
var config = builder.Configuration;

services.AddSingleton<IpfsEngine>( 
  _ => new IpfsEngine(config["ipfs:passphrase"].ToCharArray())
);
services.AddControllers();

var app = builder.Build();

app.UseRouting();

app.MapControllers();

app.Run();
