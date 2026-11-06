#!/bin/bash
# This script replaces placeholders in index.html with real environment variables provided by Vercel

# If index.html doesn't exist but index-76.html does, rename it for simplicity
if [ -f "index-76.html" ] && [ ! -f "index.html" ]; then
  cp index-76.html index.html
fi

# Replace placeholders using sed
# We use a temporary file to avoid issues during replacement
sed -i "s|{{SUPABASE_URL}}|$SUPABASE_URL|g" index.html
sed -i "s|{{SUPABASE_ANON_KEY}}|$SUPABASE_ANON_KEY|g" index.html

echo "Environment variables injected successfully into index.html"
