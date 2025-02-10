import React, {useState, useEffect, useCallback} from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import {IconButton} from 'react-native-paper';
import {Metrics} from '../../common';
import RNFetchBlob from 'rn-fetch-blob';
import RNFS from 'react-native-fs';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    margin: Metrics.scale(8),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: Metrics.scale(4),
  },
  bookCover: {
    width: Metrics.scale(112),
    height: Metrics.scale(156),
    resizeMode: 'cover',
  },
  overlay: {
    display: 'flex',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#ffffff50',
  },
  title: {
    display: 'flex',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: Metrics.scale(12),
    right: Metrics.scale(12),
    justifyContent: 'center',
    alignItems: 'center',
  },
  downloadIcon: {
    display: 'flex',
    position: 'absolute',
    bottom: Metrics.scale(4),
    right: Metrics.scale(4),
    backgroundColor: '#fff',
    borderRadius: Metrics.scale(12),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: Metrics.scale(4),
    width: Metrics.scale(12),
    height: Metrics.scale(12),
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const BookItem = ({
  id,
  data,
  slug,
  address,
  phone,
  location,
  feature_image,
  description,
  onItemPress,
  onMorePress,
}) => {
  const [downloaded, setDownloaded] = useState(false);

  useEffect(() => {
    checkData();
  }, [checkData]);

  const checkData = useCallback(async () => {
    if (!Array.isArray(data.book) || !data.book.length) {
      setDownloaded(false);
      return;
    }
    const fileExists = await Promise.all(
      data?.book?.map(async bookFileId => {
        const pathFile = RNFetchBlob.fs.dirs.CacheDir + bookFileId + '.pdf';
        return RNFS.exists(pathFile);
      }),
    );

    if (fileExists.every(a => a === true)) {
      setDownloaded(true);
    } else {
      setDownloaded(false);
    }
  }, [data?.book]);

  const handlePress = () => {
    if (!data.isCollection) {
      setDownloaded(true);
    }
    onItemPress({id, data});
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.container}>
      <Image
        style={styles.bookCover}
        source={{
          uri: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAASABIAAD/4QBYRXhpZgAATU0AKgAAAAgAAgESAAMAAAABAAEAAIdpAAQAAAABAAAAJgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAvqADAAQAAAABAAABCgAAAAD/7QA4UGhvdG9zaG9wIDMuMAA4QklNBAQAAAAAAAA4QklNBCUAAAAAABDUHYzZjwCyBOmACZjs+EJ+/8AAEQgBCgC+AwERAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/bAEMACQYHEhASFBQPEhEVFRAVGhQVFBYWFBgWFBQYFBgaFxIVFxgdKCEaGiUbFxUiMSElKSsvLi8YHzM4My03KC0uLf/bAEMBCgoKDg0OGhAQGCwkHCQsLSwsLiwsLCwsLCwsLCwsLCwsLCwsLSwsLCwsLCwsLCwsLC0sLCwsLCwsLCwsLCwsLP/dAAQAGP/aAAwDAQACEQMRAD8A9xoAKACgAoAKQBTAKQBTAKACgApAFABQAUAFABQAlABmgBaACmAUAFABQAlID//Q9xoAKACgBKTAKQBTAKAFoAKACgAoASgBaACgBKACgApAFABQAUAFMBaYBQAUgP/R9xoAKACgCC6mEaM7Zwiljjk4UZOB68UgMaTXioTMaZdoBtEuWUXDlVZht4xgex5weDSsMSXxGqGYFSTHLDEgyoDieRYkl3Z4XzC49cJwDkZAJJ9e2wzSCPLW83ksu4gE70G5WCnIw6np6jtTEVx4hZ3MaR7XBnILE7SluY92SVG1mMqjGOm454oAs6Xrn2hZXSMhY0R13HBcSQLKAwx8hwwB696AK0PiN28gm3IFyyKrbmI+e2kn4ATLY8sqcDHIOeoBYBLPxMJRZMV2i9jD4yG2NJGXiRm4xna4zjGQB/EKALljqzv5xkhCi3LK5V953KiOVA2gnhzj/d7ZFAFN/E+ER/LUmX7JhPM+ZVu5vKRmwuMAnPBIbDgH5aAHT+JVR7gFWPkmJUXjEgll8rzARyAJdytnoFDYwwyATT66wiunWEs1k5V0DH5wsaSFo2CncdjjjHUEe9FgKuoeJzECREjqbe5uUYSH547cx/7HG/zARyRgd80rDJhq8yohMSMXlEQJdkOWICll2ZXv+ABH3sAAl1fW2tsF4fkMe5n38RyH7qyYU4QnjeM4JGRjkAhZ9cIkliWMF44vMTL4WUhtsiBgCV2Exgkj+PpxQMZoHiD7W7KIiirDFKCW+YmQyKyFdowUaJ168kUCN6gApgLTAKAP/9L3GgAoAKACgCk2mwEAGGLAKkDYvBT7hHHUZOPTNIAGmQdoYvuCL7if6oHIi6fczzt6UAPksomTy2jjKZzsKqVzndnaRjOefrQBG+mwkEeVHgv5hwqjL92PHJI4J7jigCdbZAWIRMyffO0ZbjHzevHrQAfZkwo2JhPujaMLxj5fTj0oApXCW8WNyou3BwF4yMbSQo6jse3agDGXxnYh5lgO5oQ0s21GXCqF3Nkr8zfMPyPIosMsaRren3K5t/LZd2P9Sw+ZCcHBXsc4PvQI21tIiOETG0p91fuHqvTp7UASxxKowqgD0AAHPXgUgIvsUWAPLjwq7ANq4CYxsAxwuB0pgIlnGoACLgENyAfmAwGye+AOetICV4VbJKqSRtJIByp6qfb2oAjayiPWOM4z/Cv8Ry3buetAEiwqCSFUE8EgAEj0JoAloAKAFpgFMD//0/caACgAoAKACgApAUZtRiRxG7YYgEDDY53Y5xjJ2Px1+U0AEWpQuSEljOF3nDA/IDgtn0B4J7UAEWpQuwVJEYtkDDA5IUMQOeflYHigAudRijKh3AMn3QASWw6IcY6nc6D8fY0AH9pxeSJ9x8orvDbX+4Rndtxuxjnp05oApXOo2jECTBYkqAY3yx8ppCnK8gxxMcdDs+lICwurQhd2SBwDhWIVm2/KSoxn94v5n0NADxqsJVWDEh3aNcK5JdN+5QAM8eW//fNAEf8AblvsZxJlE6uquygGNZA2QMbdjq27pg9aAJxfR5QZP70kJ8rfNtBJ7dMAnJ69s0ARLqsRKgFjvJAO08sGYbAD8xb5JDwOiMTjjIBchlDKGGcMARkEHBGRweR+NAEtABQAUAFABTAWmB//1PcaACgAoAKACgApAULnS4pH3upLAAA7m4A3Y+XOM/O/OM/MaAI49HiUYVSP3bRcs5xG2MqNxPHyrj0wB0oAS10SGMqwDF0JYOzMSWZAjMRnBJUAdKALEtjG5UsCSn3SWbI+dH9efmjQ8+npQAiafGIvJCny9gj27m4QLtCg5yPlFAEMmjQMQzISVIIO5+CImiyOevlu6/8AAj3oAeNKhwV2HDEEjc+CV24br1+Ree+KAFGlxBVUKQEdpFwzgh3LFmyDnne//fVADYdIgQMqRhVcbSqkhcCNYxhQcA7EVcjnAFAEkunRsEBBxECEwzggFdp5Bz04oAZ/ZcX90/f8wct8jfNkoQcr99+n98jpxQBdUYGB24oAdQAUgCgAoAKYC0wP/9X3GgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKAP//W9xoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgD//1/caACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoA//9D3GgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKAP//R9xoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgD//0vcaACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoA//9P3GgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKAP//U9xoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgD//1fcaACgAoAKACgAoAKACgAoAKACgAoAK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',
        }}
      />
      <View style={styles.overlay} />
      <View style={styles.title}>
        <Text style={{fontSize: 16}}>{data.title}</Text>
      </View>
      <View style={styles.downloadIcon}>
        <IconButton
          icon="check"
          color={downloaded ? '#008000' : '#a9a9a9'}
          size={Metrics.scale(14)}
        />
      </View>
    </TouchableOpacity>
  );
};

export default BookItem;
