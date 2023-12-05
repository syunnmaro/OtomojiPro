import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const UserScalarFieldEnumSchema = z.enum(['id','google_id','stripe_id','point']);

export const WorkScalarFieldEnumSchema = z.enum(['id','name','created_at','author_id']);

export const PartScalarFieldEnumSchema = z.enum(['id','name','work_id','author_id']);

export const BlockScalarFieldEnumSchema = z.enum(['id','author_id','speed','speaker','volume','pitch','texts','duration','part_id']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const NullsOrderSchema = z.enum(['first','last']);
/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const userSchema = z.object({
  id: z.string(),
  google_id: z.string(),
  stripe_id: z.string().nullable(),
  point: z.number().int(),
})

export type user = z.infer<typeof userSchema>

/////////////////////////////////////////
// WORK SCHEMA
/////////////////////////////////////////

export const workSchema = z.object({
  id: z.string(),
  name: z.string(),
  created_at: z.string(),
  author_id: z.string(),
})

export type work = z.infer<typeof workSchema>

/////////////////////////////////////////
// PART SCHEMA
/////////////////////////////////////////

export const partSchema = z.object({
  id: z.string(),
  name: z.string(),
  work_id: z.string(),
  author_id: z.string(),
})

export type part = z.infer<typeof partSchema>

/////////////////////////////////////////
// BLOCK SCHEMA
/////////////////////////////////////////

export const blockSchema = z.object({
  id: z.string(),
  author_id: z.string(),
  speed: z.number(),
  speaker: z.string(),
  volume: z.number(),
  pitch: z.number().int(),
  texts: z.string(),
  duration: z.number().int(),
  part_id: z.string(),
})

export type block = z.infer<typeof blockSchema>
