<script>
    import Section from "./Section.svelte";
    const sectionsData = [
        {
            sectionName: 'Social Security App',
            subsections: [
                {
                    name: 'Dashboard'
                },
                {
                    name: 'Users'
                },
                {
                    name: 'Dashboard 3'
                }
            ]
        },
        {
            sectionName: 'Relocare',
            subsections: [
                {
                    name: 'Dashboard'
                },
                {
                    name: 'Users'
                },
                {
                    name: 'Dashboard 3'
                }
            ]
        }
    ]

</script>

{#each sectionsData as section}
    <Section sectionName={section.sectionName} subsections={section.subsections} />
{/each}