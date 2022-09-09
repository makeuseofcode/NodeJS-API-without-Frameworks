const Blog = require("../models/blogModel");

const router = async function (req, res) {
  //  GET: /api/blogs
  if (req.url === "/api/blogs" && req.method === "GET") {
    // get the blogs.
    const blogs = await Blog.find();
    // set the status code, and content-type
    res.writeHead(200, { "Content-Type": "application/json" });
    // send the data
    res.end(JSON.stringify(blogs));
  }

  //  GET: /api/blogs/:id
  if (req.url.match(/\/api\/blogs\/([0-9]+)/) && req.method === "GET") {
    try {
      // extract id from url
      const id = req.url.split("/")[3];
      // get blog from DB
      const blog = await Blog.findById(id);

      if (blog) {
        // set the status code and content-type
        res.writeHead(200, { "Content-Type": "application/json" });
        // send the data
        res.end(JSON.stringify(blog));
      } else {
        throw new Error("Requested blog does not exist");
      }
    } catch (error) {
      // set the status code and content-type
      res.writeHead(404, { "Content-Type": "application/json" });
      // send the error
      res.end(JSON.stringify({ message: error }));
    }
  }

  //  POST: /api/blogs
  if (req.url === "/api/blogs" && req.method === "POST") {
    try {
      let body = "";

      //listen for data event
      req.on("data", (chunk) => {
        body += chunk.toString();
      });

      //Listen for end event
      req.on("end", async () => {
        //Create Blog instance
        let blog = new Blog(JSON.parse(body));

        //Save instance to DB
        await blog.save();

        // set the status code and content-type
        res.writeHead(200, { "Content-Type": "application/json" });

        //send response
        res.end(JSON.stringify(blog));
      });
    } catch (error) {
      console.log(error);
    }
  }

  //PUT: /api/blogs/:id
  if (req.url.match(/\/api\/blogs\/([0-9]+)/) && req.method === "PUT") {
    try {
      // extract id from url
      const id = req.url.split("/")[3];

      let body = "";

      //listen for data event
      req.on("data", (chunk) => {
        body += chunk.toString();
      });

      req.on("end", async () => {
        let updatedBlog = await Blog.findByIdAndUpdate(id, JSON.parse(body), {
          new: true,
        });

        // set the status code and content-type
        res.writeHead(200, { "Content-Type": "application/json" });
        //send response
        res.end(JSON.stringify(updatedBlog));
      });
    } catch (error) {
      console.log(error);
    }
  }

  // DELETE: /api/blogs/:id
  if (req.url.match(/\/api\/blogs\/([0-9]+)/) && req.method === "DELETE") {
    try {
      // extract id from url
      const id = req.url.split("/")[3];
      // delete blog
      await Blog.findByIdAndDelete(id);
      // set the status code and content-type
      res.writeHead(200, { "Content-Type": "application/json" });
      // send the message
      res.end(JSON.stringify({ message: "Blog deleted sucessfully" }));
    } catch (error) {
      // set the status code and content-type
      res.writeHead(404, { "Content-Type": "application/json" });
      // send the error
      res.end(JSON.stringify({ message: error }));
    }
  }
};

module.exports = router;
