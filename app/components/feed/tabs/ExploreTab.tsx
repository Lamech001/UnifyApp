import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface CityHighlight {
  name: string;
  countLabel: string;
}

interface ExploreTabProps {
  cityHighlights: CityHighlight[];
  cityCardWidth: number;
}

export default function ExploreTab({ cityHighlights, cityCardWidth }: ExploreTabProps) {
  return (
    <View style={styles.exploreSection}>
      <Text style={styles.sectionTitle}>Explore Kenya</Text>
      <Text style={styles.sectionSubtitle}>Discover stories from across the nation</Text>

      <View style={styles.publicBadge}>
        <Text style={styles.publicBadgeText}>Public mode: all posts are visible to everyone</Text>
      </View>

      <View style={styles.citiesGrid}>
        {cityHighlights.map((city) => (
          <TouchableOpacity key={city.name} style={[styles.cityCard, { width: cityCardWidth }]}>
            <Text style={styles.cityName}>{city.name}</Text>
            <Text style={styles.cityCount}>{city.countLabel}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  exploreSection: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 12,
  },
  publicBadge: {
    backgroundColor: '#ECFDF5',
    borderColor: '#A7F3D0',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 16,
  },
  publicBadgeText: {
    color: '#065F46',
    fontSize: 12,
    fontWeight: '500',
  },
  citiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -5,
  },
  cityCard: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 5,
  },
  cityName: {
    fontSize: 14,
    color: '#1F2937',
  },
  cityCount: {
    fontSize: 12,
    color: '#6B7280',
  },
});
