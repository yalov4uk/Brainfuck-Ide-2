using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(Task4.Startup))]
namespace Task4
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
