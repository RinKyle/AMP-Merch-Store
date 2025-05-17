// supabase.js

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://oelknvardknyhbxpmdhl.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9lbGtudmFyZGtueWhieHBtZGhsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYyMzgyMTEsImV4cCI6MjA2MTgxNDIxMX0.G5Uzzb0vJyqRYHbzJ3D4-X9pLm5ElIv1HJ28sht8G-Y'

// const supabaseUrl = 'https://tsuqfkpaifkzevirqzqv.supabase.co'
// const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRzdXFma3BhaWZremV2aXJxenF2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU1OTczNzMsImV4cCI6MjA2MTE3MzM3M30.YvmRgsjhmgzjIwqlsjsjGz26rXxStn0ZOrSKzKPTVS4'

export const supabase = createClient(supabaseUrl, supabaseKey)
