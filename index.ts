#!/usr/bin/env node
import createBlogPost from './createBlogPost'

const args = process.argv.slice(2)

console.log("Welcome to Skynet. Let's get started.")

switch (args[0]) {
  case 'create':
    createBlogPost(args[1])

    break
}
