using Ipfs.Engine;

var builder = WebApplication.CreateBuilder(args);
var services = builder.Services;
var config = builder.Configuration;

services.AddSingleton<IpfsEngine>( 
  _ => new IpfsEngine(config["ipfs:passphrase"].ToCharArray())
);
services.AddControllers();
services.AddSwaggerGen();

var app = builder.Build();

app.UseRouting();
app.UseSwagger();
app.UseSwaggerUI();

app.MapControllers();

app.Run();
