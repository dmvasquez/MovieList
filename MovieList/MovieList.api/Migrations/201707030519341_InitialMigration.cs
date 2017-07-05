namespace MovieList.api.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class InitialMigration : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Lists",
                c => new
                    {
                        ListId = c.Int(nullable: false, identity: true),
                        UserId = c.Int(nullable: false),
                        Title = c.String(),
                        Description = c.String(),
                        NumberOfMovies = c.Int(nullable: false),
                        AverageRating = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.ListId)
                .ForeignKey("dbo.Users", t => t.UserId, cascadeDelete: true)
                .Index(t => t.UserId);
            
            CreateTable(
                "dbo.Placements",
                c => new
                    {
                        ListId = c.Int(nullable: false),
                        MovieId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => new { t.ListId, t.MovieId })
                .ForeignKey("dbo.Movies", t => t.MovieId, cascadeDelete: true)
                .ForeignKey("dbo.Lists", t => t.ListId, cascadeDelete: true)
                .Index(t => t.ListId)
                .Index(t => t.MovieId);
            
            CreateTable(
                "dbo.Movies",
                c => new
                    {
                        MovieId = c.Int(nullable: false, identity: true),
                        Title = c.String(),
                        Rating = c.Int(nullable: false),
                        YearReleased = c.Int(nullable: false),
                        PosterImage = c.String(),
                        Genre = c.String(),
                    })
                .PrimaryKey(t => t.MovieId);
            
            CreateTable(
                "dbo.Users",
                c => new
                    {
                        UserId = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        EmailAddress = c.String(),
                        Password = c.String(),
                        Telephone = c.String(),
                    })
                .PrimaryKey(t => t.UserId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Lists", "UserId", "dbo.Users");
            DropForeignKey("dbo.Placements", "ListId", "dbo.Lists");
            DropForeignKey("dbo.Placements", "MovieId", "dbo.Movies");
            DropIndex("dbo.Placements", new[] { "MovieId" });
            DropIndex("dbo.Placements", new[] { "ListId" });
            DropIndex("dbo.Lists", new[] { "UserId" });
            DropTable("dbo.Users");
            DropTable("dbo.Movies");
            DropTable("dbo.Placements");
            DropTable("dbo.Lists");
        }
    }
}
