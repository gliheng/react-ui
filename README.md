# ReactUI

react-ui a UI library for react. It contains dozens of reusable react components.


## Features
- The layout package is done.
- It includes containers modules (HGroup VGroup and Grid), to easily split screen into multiple panels
- These containers include gutter to resize panels.
- API to save and restore layout configuration automaticly.


## Basic Usage

```js
    Layout.render(
        <HGroup seperator="True">
            <VGroup seperator=True>
                <View klass="" params={}></View>
            </VGroup>
            <VGroup>
                <View klass="" params={}></View>
                <View klass="" params={}></View>
            </VGroup>
        </HGroup>,
        document.getElementById('app')
    )
```

```js
Layout.render(
    <Grid rows="3" cols="3">
        <View row="1" col="1"></View>
        <View row="1" col="2"></View>
        <View row="2" col="1"></View>
        <View row="2" col="2"></View>
    </Grid>,
    document.getElementById('app')
)
```

### TODO ###

var frontpage = Layout.createLayout();
frontpage.show();

layout.saveLayout()
layout.restoreLayout()


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

# TODO
minWidth maxWidth for HGroup and Grid
Grid need to persist size and position
