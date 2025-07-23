# WebStorm XML Schema Setup

To fix the "URI is not registered" error for sitemap.xml, follow these steps in WebStorm:

## Register the Sitemap Schema

1. Go to **File > Settings** (or **WebStorm > Preferences** on macOS)
2. Navigate to **Languages & Frameworks > Schemas and DTDs > XML Schema/DTD**
3. Click the **+** button to add a new schema
4. Fill in the following information:
   - **URI**: `http://www.sitemaps.org/schemas/sitemap/0.9`
   - **Location**: Select your local `sitemap.xsd` file
5. Click **OK** to save the settings

## Alternative Method

If you still see the error, you can also try:

1. Open the sitemap.xml file
2. Place your cursor over the URI (xmlns attribute)
3. Press Alt+Enter (or Option+Enter on macOS)
4. Select "Fetch external resource" or "Manually Setup External Resource"
5. Point to the local sitemap.xsd file

## Notes

- The sitemap.xml now uses a local schema reference with the xsi:schemaLocation attribute
- This should eliminate the "URI is not registered" and "Cannot resolve symbol" errors
- The local schema file (sitemap.xsd) contains all the validation rules for sitemap files
