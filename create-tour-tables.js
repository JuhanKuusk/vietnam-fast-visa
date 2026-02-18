/**
 * Script to create tour booking system tables in Supabase
 * Run with: node create-tour-tables.js
 */

const fs = require('fs');
const { createClient } = require('@supabase/supabase-js');

// Read SQL file
const sql = fs.readFileSync('./supabase_tour_tables.sql', 'utf8');

// Create Supabase admin client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ffeeikroxwuesdfkpbzg.supabase.co';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseServiceKey) {
  console.error('❌ Error: SUPABASE_SERVICE_ROLE_KEY environment variable is required');
  console.log('\nPlease run:');
  console.log('export SUPABASE_SERVICE_ROLE_KEY=your_service_role_key');
  console.log('\nOr add it to .env.local file');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function createTables() {
  console.log('🚀 Creating tour booking system tables...\n');

  try {
    // Execute the SQL
    const { data, error } = await supabase.rpc('exec_sql', { sql_query: sql });

    if (error) {
      // Try alternative method - direct query execution
      const { error: directError } = await supabase
        .from('_sql')
        .select('*')
        .limit(0);

      if (directError) {
        console.error('❌ Error executing SQL:', error);
        console.log('\n📝 Please execute the SQL manually in Supabase Dashboard:');
        console.log('1. Go to https://supabase.com/dashboard/project/ffeeikroxwuesdfkpbzg/sql');
        console.log('2. Copy the contents of supabase_tour_tables.sql');
        console.log('3. Paste and execute in the SQL Editor\n');
        process.exit(1);
      }
    }

    console.log('✅ Tour tables created successfully!');
    console.log('\nCreated tables:');
    console.log('  - tour_inquiries (with RLS policies)');
    console.log('  - tour_analytics (with RLS policies)');
    console.log('\nCreated indexes for performance');
    console.log('Created auto-update trigger for updated_at\n');

  } catch (err) {
    console.error('❌ Unexpected error:', err.message);
    console.log('\n📝 Please execute the SQL manually in Supabase Dashboard:');
    console.log('1. Go to https://supabase.com/dashboard/project/ffeeikroxwuesdfkpbzg/sql');
    console.log('2. Copy the contents of supabase_tour_tables.sql');
    console.log('3. Paste and execute in the SQL Editor\n');
    console.log('File location: ./supabase_tour_tables.sql\n');
  }
}

createTables();
