# Layout.js

Layout aim to make layout easy with dozens of reusable react components.

# TODO
minWidth maxWidth for HGroup and Grid
Grid need to persist size and position


## Features
- Easily split screen into multiple panels
- Gutter to resize panels
- API to save and restore layout configuration


## Basic Usage

var frontpage = Layout.createLayout();
frontpage.show();

layout.saveLayout()
layout.restoreLayout()

<HGroup seperator="True">
    <VGroup seperator=True>
        <View klass="" params={}></View>
    </VGroup>
    <VGroup>
        <View klass="" params={}></View>
        <View klass="" params={}></View>
    </VGroup>
</HGroup>

<Grid rows="3" cols="3">
    <View row="1" col="1"></View>
    <View row="1" col="2"></View>
    <View row="2" col="1"></View>
    <View row="2" col="2"></View>
</Grid>

<Area>
    <View></View>
    <View></View>
    <View></View>
    <View></View>
    <View></View>
</Area>

<Tabs>
    <View title="" closable="True">
        <HGroup>
        </HGroup>
    </View>
    <View></View>
</Tabs>

## More Example
Check out the examples directory
