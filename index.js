#! /usr/bin/env node

const { Command } = require('commander')
const { MongoClient } = require('mongodb')

require('dotenv').config()

const seed = require('./seeds')

const program = new Command()
program
  .command('seed')
  .description('CLI to seed mongoDb')
  .action(async () => {
    const client = new MongoClient(process.env.CONNECTION_STRING)
    try {
      await client.connect()
      const collection = client
        .db(process.env.DB_NAME)
        .collection(process.env.COLLECTION_NAME)
      await collection.insertMany(seed)
    } catch (err) {
      console.error(err)
    } finally {
      console.log('seeds added')
      await client.close()
    }
  })

program
  .command('clear')
  .description('CLI clear mongoDb')
  .action(async () => {
    const client = new MongoClient(process.env.CONNECTION_STRING)
    try {
      await client.connect()
      const collection = client
        .db(process.env.DB_NAME)
        .collection(process.env.COLLECTION_NAME)
      await collection.deleteMany({})
    } catch (err) {
      console.error(err)
    } finally {
      console.log('seeds removed')
      await client.close()
    }
  })

program.parse()
