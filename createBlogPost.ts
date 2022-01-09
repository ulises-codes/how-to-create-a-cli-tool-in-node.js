import * as Readline from 'readline'
import * as fs from 'fs'

interface NewPost {
  title: string
  author: string
  publishDate?: string
  synopsis: string
}

const formatDate = (date: Date) => {
  return date.toLocaleDateString('en-us', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

export default function createBlogPost(outDir = './blog') {
  const answers: NewPost = {
    title: '',
    author: 'John Connor',
    publishDate: formatDate(new Date()),
    synopsis: '',
  }

  const readline = Readline.createInterface(process.stdin, process.stdout)

  readline.question('Title: ', title => {
    answers.title = title

    readline.question('Author: ', author => {
      answers.author = author

      readline.question('Publish Date: ', publishDate => {
        // Check if date is valid, don't care if it's in the past
        if (publishDate && new Date(publishDate)) {
          answers.publishDate = formatDate(new Date(publishDate))
        }

        readline.question('Synopsis: ', synopsis => {
          answers.synopsis = synopsis

          // Auto-generate a filename based on the blog post's title
          const filename = answers.title.toLowerCase().replace(/ /g, '-')

          // Since we're writing to an mdx file, this metadata will be included in a yaml-style
          // header, which is opened with '---'
          let fileContents = '---\n'

          for (const [key, value] of Object.entries(answers)) {
            fileContents += `${key}: "${value}"\n`
          }

          // Close the header
          fileContents += '---'

          // Create the directory if it doesn't exist
          fs.mkdirSync(outDir, { recursive: true })

          // Write the file
          fs.writeFileSync(`${outDir}/${filename}.mdx`, fileContents)

          readline.close()
        })
      })

      // Do this to display a default a value for 'Publish Date'
      readline.write(answers.publishDate)
    })

    // Do this to display a default value for 'Author'
    readline.write(answers.author)
  })
}
