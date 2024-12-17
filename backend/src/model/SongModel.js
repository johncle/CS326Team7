import { DataTypes } from "sequelize";

export default class SongModel {
  // load instance of sequelize
  constructor(sequelize) {
    // Define the Song model
    this.Song = sequelize.define("Song", {
      id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      artistName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      albumName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      albumId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      coverUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isUrl: true,
        },
      },
      durationMs: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: true,
          min: 0,
        },
      },
    });
  }

  // set up associations for index.js
  associate(models) {
    this.Song.belongsToMany(models.Playlist, {
      through: "PlaylistSong",
      foreignKey: "songId",
      otherKey: "playlistId",
      as: "playlists",
    });
  }

  async init(models, fresh = false) {
    if (fresh) {
      await this.delete(); // Clear all existing data

      // Initial songs
      await this.create({
        id: "1QoyuMHNBe7lg3YW4Qtll4",
        title: "St. Chroma (feat. Daniel Caesar)",
        artistName: "Tyler, The Creator",
        albumName: "CHROMAKOPIA",
        albumId: "0U28P0QVB1QRxpqp5IHOlH",
        coverUrl:
          "https://i.scdn.co/image/ab67616d0000b273124e9249fada4ff3c3a0739c",
        durationMs: 197019,
      });

      // Add Beats.mp3 as a test song
      await this.create({
        id: "Beats", // ID must match filename Beats.mp3
        title: "Test Beats",
        artistName: "Test Artist",
        albumName: "Test Album",
        albumId: "12345",
        coverUrl: "https://via.placeholder.com/150", // Placeholder image URL
        durationMs: 240000,
      });
    }

    console.log("Song database initialized.");
  }

  async create(song) {
    return await this.Song.create(song);
  }

  async read(id = null) {
    if (id) {
      return await this.Song.findByPk(id);
    }
    return await this.Song.findAll();
  }

  async update(song) {
    const songToUpdate = await this.Song.findByPk(song.id);
    if (!songToUpdate) {
      console.error("Song not found.");
      return null;
    }

    await songToUpdate.update(song);
    return songToUpdate;
  }

  async delete(song = null) {
    if (song === null) {
      await this.Song.destroy({ truncate: true });
      console.log("All songs deleted.");
      return;
    }

    await this.Song.destroy({ where: { id: song.id } });
    console.log(`Song with id ${song.id} deleted.`);
    return song;
  }
}
