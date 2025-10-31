import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { Hono } from 'hono'
import { sign, verify } from 'hono/jwt'

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string,
  },
  Variables: {
    jwtPayload: any
  }
}>()

// Middleware for blog routes authentication
app.use('/api/v1/blog/*', async (c, next) => {
  const jwt = c.req.header('Authorization')
  
  if (!jwt) {
    c.status(401)
    return c.json({ error: "unauthorized" })
  }
  
  const token = jwt.split(' ')[1]
  const payload = await verify(token, c.env.JWT_SECRET)
  
  if (!payload) {
    c.status(401)
    return c.json({ error: "unauthorized" })
  }
  
  c.set('jwtPayload', payload)
  await next()
})

// Signup Route
app.post('/api/v1/user/signup', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate())

  const body = await c.req.json()
  
  try {
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password
      }
    })
    
    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET)
    return c.json({ jwt })
  } catch(e) {
    c.status(403)
    return c.json({ error: "error while signing up" })
  }
})

// Signin Route
app.post('/api/v1/user/signin', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate())

  const body = await c.req.json()
  const user = await prisma.user.findUnique({
    where: {
      email: body.email
    }
  })

  if (!user) {
    c.status(403)
    return c.json({ error: "user not found" })
  }

  const jwt = await sign({ id: user.id }, c.env.JWT_SECRET)
  return c.json({ jwt })
})

// Create Blog Post
app.post('/api/v1/blog', async (c) => {
  const userId = (c.get('jwtPayload') as { id: string }).id
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate())

  const body = await c.req.json()
  
  const post = await prisma.post.create({
    data: {
      title: body.title,
      content: body.content,
      authorId: userId
    }
  })
  
  return c.json({ id: post.id })
})

// Update Blog Post
app.put('/api/v1/blog', async (c) => {
  const userId = (c.get('jwtPayload') as { id: string }).id
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate())

  const body = await c.req.json()
  
  const post = await prisma.post.update({
    where: {
      id: body.id,
      authorId: userId
    },
    data: {
      title: body.title,
      content: body.content
    }
  })
  
  return c.json(post)
})

// Get Single Blog Post
app.get('/api/v1/blog/:id', async (c) => {
  const id = c.req.param('id')
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate())
  
  const post = await prisma.post.findUnique({
    where: {
      id
    },
    select: {
      id: true,
      title: true,
      content: true,
      author: {
        select: {
          name: true
        }
      }
    }
  })
  
  return c.json(post)
})

// Get All Blog Posts
app.get('/api/v1/blog/bulk', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate())
  
  const posts = await prisma.post.findMany({
    select: {
      content: true,
      title: true,
      id: true,
      author: {
        select: {
          name: true
        }
      }
    }
  })
  
  return c.json(posts)
})

export default app
